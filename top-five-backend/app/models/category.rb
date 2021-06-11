class Category < ApplicationRecord
    has_many :lists
    validates :name, uniqueness: true
end
