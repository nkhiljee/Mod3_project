class Api::V1::UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, include: :events
    end

    def create
    
    end

    def update
    
    end

    def destroy
    
    end
end
