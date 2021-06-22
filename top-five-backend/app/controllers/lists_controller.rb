class ListsController < ApplicationController
    def index
        if params[:category_id]
            category = Category.find_by_id(params[:category_id])
            lists = category.lists
            render json: ListSerializer.new(lists).to_serialized_json
        end
    end

    def update
        list = List.find_by_id(params[:id])
        if list.update(list_params)
            render json: ListSerializer.new(list).to_serialized_json
        end
    end

    private

    def list_params
        params.require(:list).permit(:title, items_attributes: [:id, :name, :rank])
    end
end
