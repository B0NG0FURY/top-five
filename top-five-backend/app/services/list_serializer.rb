class ListSerializer
    def initialize(lists_object)
        @lists = lists_object
    end

    def to_serialized_json
        @lists.to_json(include: {
            items_ranked: {only: [:id, :name, :rank]}
        }, except: [:created_at, :updated_at])
    end
end