class ListsController < ApplicationController
    def index
        if params[:category_id]
            category = Category.find_by_id(params[:category_id])
            lists = category.lists
            render json: ListSerializer.new(lists).to_serialized_json
        end
    end
end
