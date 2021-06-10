class RemoveItemsFromLists < ActiveRecord::Migration[6.1]
  def change
    remove_column :lists, :items, :string
  end
end
