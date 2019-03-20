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

ActiveRecord::Schema.define(version: 2019_03_13_020439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conventions", force: :cascade do |t|
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

end
