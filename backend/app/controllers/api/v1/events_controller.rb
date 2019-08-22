class Api::V1::EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events
    end

    def show
        @event = Event.find(params[:id])
        render json: @event#, include: :users
    end

    def create
        @event = Event.create(event_params)
        render json: @event, status: 201
    end

    def update
        @event = Event.find(params[:id])
        # byebug
        @event.update(event_params)
        render json: @event, status: 201
    end

    def destroy
        @event = Event.find(params[:id])
        @event.destroy
    end

    private
    def event_params
        params.require(:event).permit(:name, :img_url, :description, :date, :start_time, :end_time, :address, :city, :state, :zipcode, :price, :lat, :long, :tag, :user_id)
    end

end
