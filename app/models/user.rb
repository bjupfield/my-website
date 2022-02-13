class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true, length: {minimum: 4}
    validates :password, length: {minimum: 6}
    has_secure_password
    has_many :save_files, dependent: :destroy
    has_many :likes
end
