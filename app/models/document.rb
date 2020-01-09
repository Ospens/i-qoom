require 'csv'

class Document < ApplicationRecord
  attr_accessor :review_status,
                :review_status_options,
                :reviewers,
                :review_issuers,
                :unplan_document

  serialize :emails

  belongs_to :user

  belongs_to :convention

  belongs_to :revision,
             class_name: 'DocumentRevision',
             foreign_key: 'document_revision_id'

  has_one :document_main,
          through: :revision

  has_one :project,
          through: :document_main

  has_many :document_fields,
           as: :parent,
           index_errors: true,
           dependent: :destroy

  has_many :document_native_file_downloads,
           dependent: :destroy

  has_many :document_email_groups,
           dependent: :destroy

  delegate :project_code,
           to: :document_main

  accepts_nested_attributes_for :document_fields

  validates_associated :document_fields

  validates :review_status,
            presence: true,
            if: :first_document_in_chain?

  validates :reviewers,
            :review_issuers,
            length: { minimum: 1 },
            if: :reviewers_and_review_issuers_required?

  validates :contractor,
            presence: true,
            if: -> { !first_document_in_chain? && !revision.versions.any? }

  validate :prevent_update_of_codification_string,
           on: :create

  validate :prevent_update_of_revision_number,
           on: :create

  validate :prevent_update_of_values,
           on: :update

  validate :prevent_adding_more_fields_than_in_convention,
           on: :create

  validate :prevent_update_of_fields_from_convention,
           on: :create

  validate :prevent_update_of_values_from_convention,
           on: :create

  validate :prevent_update_of_previous_revisions,
           on: :create

  validate :review_status_value,
           on: :create,
           if: :first_document_in_chain?

  before_validation :assign_document_revision_version_field,
                    unless: :document_revision_version_present?

  before_validation :assign_convention

  before_validation :set_review_status_if_planned_document,
                    if: -> { document_main.planned? && !unplan_document }

  before_create :set_review_status_in_document_main,
                if: :first_document_in_chain?

  before_create :set_reviewers_and_review_issuers_in_document_main,
                if: :reviewers_and_review_issuers_required?

  before_create :assign_doc_id

  before_create :unplan_document_main,
                if: -> { document_main.planned? && unplan_document }

  scope :order_by_revision_version, -> { order(Arel.sql('revision_version::integer ASC')) }

  scope :first_version, -> { order_by_revision_version.first }

  scope :last_version, -> { order_by_revision_version.last }

  scope :filter_by_codification_kind, -> (codification_kind, value) {
    joins(:document_fields)
      .where(document_fields: {
              codification_kind: codification_kind,
              value: value })
  }

  scope :filter_by_codification_kind_and_value, -> (codification_kind, value, selected = true) {
    documents =
      joins(document_fields: :document_field_values)
      .where(document_fields: {
              codification_kind: codification_kind,
              document_field_values: {
                value: value, selected: selected } })
    Document.where(id: documents.pluck(:id))
  }

  scope :values_for_filters, -> (args) {
    fields = DocumentField.where(parent: all).where(args)
    DocumentFieldValue.where(document_field: fields, selected: true)
                      .pluck(:value, :title).uniq
  }

  scope :filter_by_document_field_title_and_value, -> (title, value) {
    documents1 = filter_by_document_select_field_title_and_value(title, value)
    documents2 = filter_by_document_text_field_title_and_value(title, value)
    Document.where(id: documents1.pluck(:id) + documents2.pluck(:id))
  }

  scope :filter_by_document_select_field_title_and_value, -> (title, value) {
    documents =
      joins(document_fields: :document_field_values)
      .where(document_fields: {
              title: title,
              document_field_values: {
                value: value,
                selected: true } }).or(
      joins(document_fields: :document_field_values)
      .where(document_fields: {
              title: title,
              document_field_values: {
                title: value,
                selected: true } }))
    Document.where(id: documents.pluck(:id))
  }

  scope :filter_by_document_text_field_title_and_value, -> (title, value) {
    documents =
      joins(:document_fields)
      .where(document_fields: {
        title: title,
        value: value })
    Document.where(id: documents.pluck(:id))
  }

  scope :filter_by_document_title, -> (title) {
    documents =
      where('LOWER(documents.title) LIKE :title', title: "%#{title.downcase}%")
    Document.where(id: documents.pluck(:id))
  }

  scope :filter_by_doc_id, -> (doc_id) {
    documents =
      where('LOWER(documents.doc_id) LIKE :title', title: "%#{doc_id.downcase}%")
    Document.where(id: documents.pluck(:id))
  }

  scope :search, -> (text) {
    documents =
      includes(document_fields: :document_field_values)
        .where('LOWER(documents.title) LIKE :search OR
                (document_fields.kind = :select_field AND
                   document_field_values.selected = true AND
                   (LOWER(document_field_values.value) LIKE :search OR
                    LOWER(document_field_values.title) LIKE :search)) OR
                (document_fields.kind = :text_field AND LOWER(document_fields.value) LIKE :search)',
                search: "%#{text.downcase}%",
                select_field: DocumentField.kinds[:select_field],
                text_field: DocumentField.kinds[:text_field])
        .distinct
    Document.where(id: documents.pluck(:id))
  }

  def self.build_from_convention(convention, user)
    doc = self.new.attributes.except('id', 'created_at', 'updated_at')
    doc['document_fields'] = []
    convention.document_fields.each do |field|
      field_attributes = field.build_for_new_document(user)
      if field_attributes.present?
        doc['document_fields'] << field_attributes
      end
    end
    doc
  end

  def can_create?(user)
    project.can_create_documents?(user)
  end

  def can_view?(user)
    # user cannot view document if he has no access to all
    # selected values of document for each field that can be limited by value.
    # when viewing document we check saved convention
    fields = convention.document_fields.limit_by_value
    team = project.dms_teams.joins(:users).where(users: { id: user.id }).first
    !fields.map do |field|
      selected_field =
        document_fields
          .find_by(codification_kind: field.codification_kind)
      selected_value =
        selected_field.document_field_values.find_by(selected: true)
      field.document_rights
           .joins(:document_field_value)
           .where(parent: user,
                  limit_for: :value,
                  enabled: true,
                  document_field_values: { value: selected_value.value }).any?
    end.include?(false) ||
      (team.present? && !fields.map do |field|
        selected_field =
          document_fields
            .find_by(codification_kind: field.codification_kind)
        selected_value =
          selected_field.document_field_values.find_by(selected: true)
        team.document_rights
            .joins(:document_field_value)
            .where(document_field: field,
                   limit_for: :value,
                   enabled: true,
                   document_field_values: { value: selected_value.value }).any?
      end.include?(false)) ||
      project.dms_master?(user)
  end

  def attributes_for_edit
    doc = attributes.except('created_at', 'updated_at')
    doc['document_fields'] = []
    document_fields.each do |field|
      field_attributes = field.build_for_edit_document
      if field_attributes.present?
        doc['document_fields'] << field_attributes
      end
    end
    doc['additional_information'] = additional_information
    doc
  end

  def attributes_for_show
    doc = attributes_for_edit
    doc['project_name'] = project.name
    doc['document_id'] = codification_string
    doc['username'] = user.attributes.slice('first_name', 'last_name')
    doc['created_at'] = created_at
    doc
  end

  def codification_string
    str = ''
    str << "#{project_code}-" if project_code.present?
    [ 'originating_company',
      'discipline',
      'document_type',
      'document_number' ].each do |kind|
      field = document_fields.detect{ |i| i['codification_kind'] == kind }
      unless kind == 'document_number'
        field = field.document_field_values.detect{ |i| i['selected'] == true }
      end
      if field.present? && field.value.present?
        str << '-' if kind != 'originating_company'
        str << field.value
      end
    end
    str
  end

  def additional_information_field
    document_fields.find_by(codification_kind: :additional_information)
  end

  def native_file
    document_fields.find_by(codification_kind: :document_native_file).file
  end

  def self.visible_columns
    ['codification_string', 'revision_date', 'revision_version']
  end

  def self.assign_rows(array)
    records = all.load
    return array if records.length == 0
    columns = visible_columns
    array << columns.map do |column|
      I18n.t("documents.list.#{column}")
    end
    records.each do |record|
      line = []
      columns.each do |column|
        line.push(record.send(column))
      end
      array << line
    end
    array
  end

  def self.to_csv
    # For UTF-8 characters
    head = 'EF BB BF'.split(' ').map { |a| a.hex.chr }.join
    CSV.generate(head) do |csv|
      assign_rows(csv)
    end
  end

  def self.to_xlsx
    p = Axlsx::Package.new
    sheet = p.workbook.add_worksheet(name: 'Documents')
    assign_rows(sheet)
    p.to_stream.read
  end

  def revision_date
    document_fields.find_by(codification_kind: :revision_date).value
  end

  def first_document_in_chain?
    !document_main.revisions.first_revision.versions.any?
  end

  def revision_number_field
    document_fields.detect{ |i| i['codification_kind'] == 'revision_number' }
  end

  def reviewers_and_review_issuers_required?
    if document_main.planned?
      unplan_document && review_status != 'issued_for_information'
    else
      review_status != 'issued_for_information' && first_document_in_chain?
    end
  end

  def save_emails(initiator, array)
    if !array.respond_to?('map') ||
        !array.map{ |i| DocumentEmail.check_if_string_valid?(i) }.include?(true)
      return
    end
    group = document_email_groups.create(user: initiator)
    group.create_emails(array)
  end

  def send_emails
    document_email_groups.last.send_emails
  end

  private

  def original_document
    document_main.revisions.order_by_revision_number.first.versions.first_version
  end

  def prevent_update_of_codification_string
    if original_document.present? &&
        original_document.codification_string != codification_string
      errors.add(:document_fields, :codification_string_changed)
    end
  end

  def prevent_update_of_previous_revisions
    if revision != document_main.revisions.last_revision
      errors.add(:document_fields, :updating_of_previous_revisions_is_not_allowed)
    end
  end

  def prevent_update_of_revision_number
    last_version = revision.versions.last_version
    if last_version.present? &&
        last_version.revision_number_field.value != revision_number_field.value
      errors.add(:document_fields, :revision_number_change_is_not_allowed)
    end
  end

  def prevent_update_of_values
    error =
      document_fields.map do |field|
        field.document_field_values.map do |value|
          # bug https://github.com/rails/rails/issues/31937
          value.changed? && !(value.changes.keys - ['created_at', 'updated_at']).empty?
        end.include?(true)
      end.include?(true)
    errors.add(:document_fields, :codification_field_changed) if error
  end

  def prevent_adding_more_fields_than_in_convention
    # adding more fields than in convention is not allowed
    # but removing some fields is allowed
    # since some fields could be hidden from user
    if convention.document_fields.length < document_fields.length
      errors.add(:document_fields, :the_number_of_document_fields_is_wrong)
    end
  end

  def prevent_update_of_fields_from_convention
    convention.document_fields.each do |field|
      attrs = field.attributes.slice('kind',
                                     'codification_kind',
                                     'column',
                                     'row',
                                     'required',
                                     'multiselect',
                                     'title',
                                     'command')
      contains_field =
        document_fields.detect do |i|
          (attrs.to_a - i.attributes.to_a).empty?
        end.present?
      if !contains_field
        errors.add(:document_fields, :wrong_field_added_to_document)
      end
    end
  end

  def prevent_update_of_values_from_convention
    convention.document_fields.where(kind: :select_field).each do |field|
      attrs = field.attributes.slice('kind',
                                     'codification_kind',
                                     'title',
                                     'command')
      current_field =
        document_fields.detect do |i|
          (attrs.to_a - i.attributes.to_a).empty?
        end
      next if current_field.blank?
      if field.document_field_values.length != current_field.document_field_values.length
        errors.add(:document_fields, :wrong_number_of_values_in_field)
      end
      field.document_field_values.each do |value|
        value_attrs = value.attributes.slice('value',
                                             'title',
                                             'position')
        contains_value =
          current_field.document_field_values.detect do |i|
            (value_attrs.to_a - i.attributes.to_a).empty?
          end.present?
        if !contains_value
          errors.add(:document_fields, :wrong_value_added_to_field)
        end
      end
    end
  end

  def additional_information
    return if additional_information_field.blank?
    revisions = document_main.revisions.order_by_revision_number
    temporal_value = []
    revisions.each do |rev|
      next if rev.last_version.blank?
      val = rev.last_version.additional_information_field.value
      next if val.blank?
      temporal_value << { revision: rev.revision_number, value: val }
    end
    final_value = []
    temporal_value.each_with_index do |val, index|
      prev_val = temporal_value[index - 1]
      if prev_val.present? && val[:value] == prev_val[:value] && !index.zero?
        h = final_value.detect{ |i| i[:min] == prev_val[:revision] || i[:max] == prev_val[:revision] }
        h[:max] = val[:revision]
      else
        final_value << { min: val[:revision], max: val[:revision], value: val[:value]}
      end
    end
    final_value
  end

  def document_revision_version_present?
    document_fields.detect{ |i| i['codification_kind'] == 'revision_version' }.present?
  end

  def assign_document_revision_version_field
    document_fields.new(kind: :hidden_field, codification_kind: :revision_version, column: 1)
  end

  def assign_convention
    self.convention =
      if first_document_in_chain?
        project.conventions.active
      else
        original_document.convention
      end
  end

  def set_review_status_in_document_main
    revision.document_main.update(document_review_status: review_status)
  end

  def review_status_value
    if !DocumentMain.document_review_statuses.keys.include?(review_status) ||
        ['in_progress', 'accepted', 'rejected'].include?(review_status)
      errors.add(:review_status, :invalid)
    end
  end

  def set_reviewers_and_review_issuers_in_document_main
    reviewers.each do |reviewer|
      if project.members.find_by(user_id: reviewer).try(:dms_module_access?)
        document_main.reviewers << User.find_by(id: reviewer)
      end
    end
    review_issuers.each do |review_issuer|
      if project.members.find_by(user_id: review_issuer).try(:dms_module_access?)
        document_main.review_issuers << User.find_by(id: review_issuer)
      end
    end
  end

  def assign_doc_id
    self.doc_id = codification_string
  end

  def unplan_document_main
    document_main.update(planned: false)
  end

  def set_review_status_if_planned_document
    self.review_status = 'issued_for_information'
  end
end
