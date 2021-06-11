class CategoriesController < ApplicationController
    def index
        sightings = Sighting.all
        render json: sightings.to_json(only: [:id, :name])
    end

    def create
    end
end
