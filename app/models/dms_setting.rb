class DmsSetting < ApplicationRecord
  belongs_to :project

  belongs_to :user

  validates_uniqueness_of :name, scope: :user_id

  validates :user,
            presence: true
  # block user update
  validates :user_id,
            inclusion: { in: ->(i) { [i.user_id_was] } },
            on: :update

  def self.show_all_revisions?(user)
    setting = all.find_by(name: 'show_all_revisions', user: user)
    # by default showing only latest revision and latest version of revision
    # for each document
    setting.present? ? setting.value == 'true' : false
  end

  def self.attributes_for_edit(project, user)
    settings = []
    settings << project.dms_settings.find_or_initialize_by(name: 'show_all_revisions', user: user)
    settings.map(&:attributes).each { |h| h.slice!('id', 'name', 'value') }
  end
end
