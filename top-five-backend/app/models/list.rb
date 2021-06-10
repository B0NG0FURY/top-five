class List < ApplicationRecord
    belongs_to :category
    has_many :items

    def items_ranked
        self.items.sort_by {|item| item.rank}
    end
end
