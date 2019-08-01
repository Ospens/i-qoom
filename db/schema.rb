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

ActiveRecord::Schema.define(version: 2019_07_27_213845) do

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
    t.string "name"
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
    t.index ["project_id"], name: "index_document_mains_on_project_id"
  end

  create_table "document_review_subjects", force: :cascade do |t|
    t.integer "status"
    t.string "title"
    t.string "document_reference"
    t.bigint "document_revision_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_revision_id"], name: "index_document_review_subjects_on_document_revision_id"
    t.index ["user_id"], name: "index_document_review_subjects_on_user_id"
  end

  create_table "document_revisions", force: :cascade do |t|
    t.bigint "document_main_id"
    t.string "revision_number"
    t.index ["document_main_id"], name: "index_document_revisions_on_document_main_id"
  end

  create_table "document_rights", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "document_field_id"
    t.integer "limit_for"
    t.boolean "enabled", default: false
    t.boolean "view_only", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "document_field_value_id"
    t.index ["document_field_id"], name: "index_document_rights_on_document_field_id"
    t.index ["document_field_value_id"], name: "index_document_rights_on_document_field_value_id"
    t.index ["user_id"], name: "index_document_rights_on_user_id"
  end

  create_table "documents", force: :cascade do |t|
    t.integer "issued_for"
    t.string "email_title"
    t.boolean "email_title_like_document", default: true
    t.text "email_text"
    t.string "revision_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "project_id"
    t.bigint "document_revision_id"
    t.bigint "convention_id"
    t.text "emails"
    t.string "title"
    t.index ["convention_id"], name: "index_documents_on_convention_id"
    t.index ["document_revision_id"], name: "index_documents_on_document_revision_id"
    t.index ["project_id"], name: "index_documents_on_project_id"
    t.index ["user_id"], name: "index_documents_on_user_id"
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
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "creation_step", default: 0
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "conventions", "projects"
  add_foreign_key "dms_settings", "projects"
  add_foreign_key "dms_settings", "users"
  add_foreign_key "document_field_values", "document_fields"
  add_foreign_key "document_folders", "projects"
  add_foreign_key "document_folders", "users"
  add_foreign_key "document_mains", "projects"
  add_foreign_key "document_review_subjects", "document_revisions"
  add_foreign_key "document_review_subjects", "users"
  add_foreign_key "document_revisions", "document_mains"
  add_foreign_key "document_rights", "document_field_values"
  add_foreign_key "document_rights", "document_fields"
  add_foreign_key "document_rights", "users"
  add_foreign_key "documents", "conventions"
  add_foreign_key "documents", "document_revisions"
  add_foreign_key "documents", "projects"
  add_foreign_key "documents", "users"
end
