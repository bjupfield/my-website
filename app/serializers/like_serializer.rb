class LikeSerializer < ActiveModel::Serializer
  # attributes :id
  attributes :id, :ifUser
  def ifUser
    p instance_options[:user_id]
    (self.object.user_id == instance_options[:user_id])
  end
end
