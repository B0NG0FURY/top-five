class ListsController < ApplicationController
    def index
        if params[:category_id]
            category = Category.find_by_id(params[:category_id])
            lists = category.lists
            render json: ListSerializer.new(lists).to_serialized_json
        end
    end

    def create
        list = List.new(list_params)
        if params[:category][:name] != ""
            category = Category.find_or_create_by(name: params[:category][:name].titleize)
            list.category_id = category.id
        elsif params[:list][:category_id] > 0
            list.category_id = params[:list][:category_id]
        end
        if list.save
            render json: ListSerializer.new(list).to_serialized_json
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
