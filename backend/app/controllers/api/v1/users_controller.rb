class Api::V1::UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, include: :events
    end

    def show
        @user = User.find(params[:id])
        render json: @user, include: :events
    end
end
