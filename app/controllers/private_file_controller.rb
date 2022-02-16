class PrivateFileController < ApplicationController
    def create
        p params[:file_data]
        file = PrivateFile.create(file_data: params[:file_data], file_name: params[:file_name], file_mime: params[:file_mime])
        render json: file, status: 200
    end
    def get
        p "|||||||"
        p "Here I AM"
        p params[:id]
        p "|||||||"
        p PrivateFile.find(1);
        file = PrivateFile.find(params[:id])
        render json: file, status: 200
    end
end
