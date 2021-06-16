class ItemsController < ApplicationController
    def swap
        movingDown = Item.find_by_id(params[:down_id])
        movingUp = Item.find_by_id(params[:up_id])

        movingDown.rank += 1
        movingUp.rank -= 1

        if movingDown.save && movingUp.save
            render json: [movingUp, movingDown].to_json(only: [:id, :name, :rank])
        end
    end
end
