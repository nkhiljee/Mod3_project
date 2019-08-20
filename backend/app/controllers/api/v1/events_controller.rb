class Api::V1::EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events
    end

    def create
        console.log(params)
    end

    def update
    
    end

    def destroy
    
    end
end
