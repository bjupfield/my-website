class SaveFileAntiUserSerializer < ActiveModel::Serializer
  attributes :id, :file_data, :file_mime, :file_name, :share, :created_at, :check
  has_many :likes, serializer: LikeSerializer
  has_many :user
  def check
    # p instance_options
  end
end