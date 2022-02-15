class CreatePrivateFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :private_files do |t|
      t.binary :file_data
      t.string :file_name
      t.string :file_mime
      t.timestamps
    end
  end
end
