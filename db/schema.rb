# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_08_041504) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "company_name"
    t.string "street"
    t.string "house_number"
    t.string "city"
    t.string "postcode"
    t.string "country"
    t.string "district"
    t.string "district_court"
  end

  create_table "conventions", force: :cascade do |t|
    t.integer "number", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "project_id"
    t.integer "version"
    t.index ["project_id"], name: "index_conventions_on_project_id"
  end

  create_table "disciplines", force: :cascade do |t|
    t.string "title"
    t.integer "project_id"
  end

  create_table "dms_settings", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.bigint "project_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_dms_settings_on_project_id"
    t.index ["user_id"], name: "index_dms_settings_on_user_id"
  end

  create_table "dms_teams", force: :cascade do |t|
    t.string "name"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_dms_teams_on_project_id"
  end

  create_table "dms_teams_users", id: false, force: :cascade do |t|
    t.bigint "dms_team_id", null: false
    t.bigint "user_id", null: false
    t.index ["dms_team_id", "user_id"], name: "index_dms_teams_users_on_dms_team_id_and_user_id"
    t.index ["user_id", "dms_team_id"], name: "index_dms_teams_users_on_user_id_and_dms_team_id"
  end

  create_table "document_field_values", force: :cascade do |t|
    t.bigint "document_field_id"
    t.string "value"
    t.string "title"
    t.integer "position"
    t.boolean "selected", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_field_id"], name: "index_document_field_values_on_document_field_id"
  end

  create_table "document_fields", force: :cascade do |t|
    t.string "parent_type"
    t.bigint "parent_id"
    t.integer "kind"
    t.integer "codification_kind"
    t.integer "column"
    t.integer "row"
    t.boolean "required", default: false
    t.boolean "multiselect", default: false
    t.string "title"
    t.string "command"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_type", "parent_id"], name: "index_document_fields_on_parent_type_and_parent_id"
  end

  create_table "document_folders", force: :cascade do |t|
    t.bigint "project_id"
    t.bigint "user_id"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_document_folders_on_project_id"
    t.index ["user_id"], name: "index_document_folders_on_user_id"
  end

  create_table "document_folders_mains", id: false, force: :cascade do |t|
    t.bigint "document_folder_id", null: false
    t.bigint "document_main_id", null: false
    t.index ["document_folder_id", "document_main_id"], name: "index_document_folder_id_and_document_main_id"
    t.index ["document_main_id", "document_folder_id"], name: "index_document_main_id_and_document_folder_id"
  end

  create_table "document_mains", force: :cascade do |t|
    t.bigint "project_id"
    t.string "project_code"
    t.integer "document_review_status", default: 0
    t.index ["project_id"], name: "index_document_mains_on_project_id"
  end

  create_table "document_mains_review_issuers", id: false, force: :cascade do |t|
    t.bigint "document_main_id", null: false
    t.bigint "review_issuer_id", null: false
  end

  create_table "document_mains_reviewers", id: false, force: :cascade do |t|
    t.bigint "document_main_id", null: false
    t.bigint "reviewer_id", null: false
  end

  create_table "document_review_comments", force: :cascade do |t|
    t.bigint "document_review_subject_id"
    t.bigint "user_id"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_review_subject_id"], name: "index_document_review_comments_on_document_review_subject_id"
    t.index ["user_id"], name: "index_document_review_comments_on_user_id"
  end

  create_table "document_review_owners", force: :cascade do |t|
    t.bigint "project_id"
    t.bigint "user_id"
    t.string "originating_company"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_document_review_owners_on_project_id"
    t.index ["user_id"], name: "index_document_review_owners_on_user_id"
  end

  create_table "document_review_subjects", force: :cascade do |t|
    t.integer "status", default: 0
    t.string "title"
    t.string "document_reference"
    t.bigint "document_revision_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "review_issuer_id"
    t.index ["document_revision_id"], name: "index_document_review_subjects_on_document_revision_id"
    t.index ["review_issuer_id"], name: "index_document_review_subjects_on_review_issuer_id"
    t.index ["user_id"], name: "index_document_review_subjects_on_user_id"
  end

  create_table "document_review_subjects_review_completes", force: :cascade do |t|
    t.bigint "document_review_subject_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_review_subject_id"], name: "document_review_subject_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "document_review_subjects_reviewers", id: false, force: :cascade do |t|
    t.bigint "document_review_subject_id", null: false
    t.bigint "reviewer_id", null: false
    t.index ["document_review_subject_id"], name: "index_document_review_subjects_reviewers_on_subject_id"
    t.index ["reviewer_id"], name: "index_document_review_subjects_reviewers_on_reviewer_id"
  end

  create_table "document_review_subjects_tags", id: false, force: :cascade do |t|
    t.bigint "document_review_subject_id", null: false
    t.bigint "tag_id", null: false
    t.index ["document_review_subject_id"], name: "index_on_document_review_subject_id"
    t.index ["tag_id"], name: "index_document_review_subjects_tags_on_tag_id"
  end

  create_table "document_review_tags", force: :cascade do |t|
    t.string "name"
    t.integer "position", default: 1
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_document_review_tags_on_project_id"
  end

  create_table "document_revisions", force: :cascade do |t|
    t.bigint "document_main_id"
    t.string "revision_number"
    t.index ["document_main_id"], name: "index_document_revisions_on_document_main_id"
  end

  create_table "document_rights", force: :cascade do |t|
    t.bigint "document_field_id"
    t.integer "limit_for"
    t.boolean "enabled", default: false
    t.boolean "view_only", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "document_field_value_id"
    t.string "parent_type"
    t.bigint "parent_id"
    t.index ["document_field_id"], name: "index_document_rights_on_document_field_id"
    t.index ["document_field_value_id"], name: "index_document_rights_on_document_field_value_id"
    t.index ["parent_type", "parent_id"], name: "index_document_rights_on_parent_type_and_parent_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "email_title"
    t.boolean "email_title_like_document", default: true
    t.text "email_text"
    t.string "revision_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "document_revision_id"
    t.bigint "convention_id"
    t.text "emails"
    t.string "title"
    t.string "doc_id"
    t.string "contractor"
    t.index ["convention_id"], name: "index_documents_on_convention_id"
    t.index ["document_revision_id"], name: "index_documents_on_document_revision_id"
    t.index ["user_id"], name: "index_documents_on_user_id"
  end

  create_table "message_recipients", force: :cascade do |t|
    t.integer "user_id"
    t.integer "message_id"
    t.integer "status", default: 0
    t.datetime "read_at"
  end

  create_table "messages", force: :cascade do |t|
    t.string "subject"
    t.text "body"
    t.integer "sender_id"
    t.integer "status", default: 0
    t.datetime "sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_administrators", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone_code"
    t.string "phone_number"
    t.integer "project_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.datetime "first_confirmation_sent_at"
    t.datetime "confirmation_resent_at"
    t.integer "inviter_id"
  end

  create_table "project_company_data", force: :cascade do |t|
    t.string "registration_number"
    t.string "vat_id"
    t.integer "project_id"
    t.integer "billing_address_id"
    t.integer "company_address_id"
  end

  create_table "project_members", force: :cascade do |t|
    t.integer "employment_type"
    t.integer "company_type"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone_code"
    t.string "phone_number"
    t.string "member_id"
    t.integer "project_id"
    t.integer "user_id"
    t.integer "creation_step"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "company_address_id"
    t.integer "discipline_id"
    t.string "job_title"
    t.integer "role_id"
    t.datetime "confirmation_sent_at"
    t.integer "inviter_id"
    t.boolean "cms_module_access", default: false
    t.boolean "dms_module_access", default: false
    t.boolean "cms_module_master", default: false
    t.boolean "dms_module_master", default: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "creation_step", default: 0
    t.string "project_code"
    t.integer "status"
    t.datetime "start_date"
    t.boolean "archived", default: false
  end

  create_table "read_marks", id: :serial, force: :cascade do |t|
    t.string "readable_type", null: false
    t.integer "readable_id"
    t.string "reader_type", null: false
    t.integer "reader_id"
    t.datetime "timestamp"
    t.index ["readable_type", "readable_id"], name: "index_read_marks_on_readable_type_and_readable_id"
    t.index ["reader_id", "reader_type", "readable_type", "readable_id"], name: "read_marks_reader_readable_index", unique: true
    t.index ["reader_type", "reader_id"], name: "index_read_marks_on_reader_type_and_reader_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "title"
    t.integer "project_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "last_name"
    t.string "country"
    t.string "state"
    t.string "city"
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "conventions", "projects"
  add_foreign_key "dms_settings", "projects"
  add_foreign_key "dms_settings", "users"
  add_foreign_key "dms_teams", "projects"
  add_foreign_key "document_field_values", "document_fields"
  add_foreign_key "document_folders", "projects"
  add_foreign_key "document_folders", "users"
  add_foreign_key "document_mains", "projects"
  add_foreign_key "document_review_comments", "document_review_subjects"
  add_foreign_key "document_review_comments", "users"
  add_foreign_key "document_review_owners", "projects"
  add_foreign_key "document_review_owners", "users"
  add_foreign_key "document_review_subjects", "document_revisions"
  add_foreign_key "document_review_subjects", "users"
  add_foreign_key "document_review_subjects", "users", column: "review_issuer_id"
  add_foreign_key "document_review_subjects_review_completes", "document_review_subjects"
  add_foreign_key "document_review_subjects_review_completes", "users"
  add_foreign_key "document_review_tags", "projects"
  add_foreign_key "document_revisions", "document_mains"
  add_foreign_key "document_rights", "document_field_values"
  add_foreign_key "document_rights", "document_fields"
  add_foreign_key "documents", "conventions"
  add_foreign_key "documents", "document_revisions"
  add_foreign_key "documents", "users"
end
