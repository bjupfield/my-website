class CreateSaveFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :save_files do |t|
      t.binary :file_data
      t.string :file_name
      t.string :file_mime
      t.integer :user_id
      t.timestamps
    end
  end
end
