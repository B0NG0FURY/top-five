class List < ApplicationRecord
    belongs_to :category
    has_many :items
    accepts_nested_attributes_for :items
    validates :title, presence: true
    before_save :normalize_title

    def self.most_recent
        self.all.reverse.first(6)
    end

    def items_ranked
        self.items.sort_by {|item| item.rank}
    end


    private

    def normalize_title
        self.title = self.title.titleize
    end
end
