class CreateSaveFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :save_files do |t|
      t.binary :file_data
      t.string :file_name
      t.string :file_mime
      t.integer :user_id
      t.boolean :share
      t.timestamps
    end
  end
end
