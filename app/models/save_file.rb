class SaveFile < ApplicationRecord
    belongs_to :user
    has_many :likes, dependent: :destroy
    validates :file_name, :file_mime, :user_id, presence: true
end
