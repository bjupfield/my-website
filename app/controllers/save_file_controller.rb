class SaveFileController < ApplicationController
    def create
        p params[:file_data]
        p params[:file_name]
        p params[:file_mime]
        b = SaveFile.create!(user_id: 1, file_data: params[:file_data], file_name: params[:file_name], file_mime: params[:file_mime])
        render json: b, status: 200
    end
    private
    # def saveFileParams
        # params.permit(:file_data, :file_name, :file_mime)
    # end
end
