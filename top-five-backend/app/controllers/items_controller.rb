class ItemsController < ApplicationController
    def swap
        movingDown = Item.find_by_id(params[:down_id])
        movingUp = Item.find_by_id(params[:up_id])

        if movingDown.update(rank: params[:up_rank]) && movingUp.update(rank: params[:down_rank])
            render json: [movingUp, movingDown].to_json(only: [:id, :name, :rank])
        end
    end
end
