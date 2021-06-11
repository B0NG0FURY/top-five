class CategoriesController < ApplicationController
    def index
        categories = Category.all
        render json: categories.to_json(only: [:id, :name])
    end

    def create
    end
end
