class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :rank
      t.integer :list_id

      t.timestamps
    end
  end
end
