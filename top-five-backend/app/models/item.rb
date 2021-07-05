class Item < ApplicationRecord
    belongs_to :list
    validates :rank, :inclusion => 1..5
    before_save :normalize_name

    private

    def normalize_name
        self.name = self.name.titleize
    end
end
