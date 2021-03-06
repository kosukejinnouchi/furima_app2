class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable

  validates :name, presence: true, uniqueness: { case_sensitive: true }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: true }, format: { with: VALID_EMAIL_REGEX }
  
  VALID_PASSWORD_REGEX = /\A[a-z0-9]+\z/i
  validates :password, presence: true, length: { minimum: 7 }, format: { with: VALID_PASSWORD_REGEX }

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture

  has_one :profile
  has_one :address
  has_many :items
  has_many :credit_cards
  has_many :purchase
  has_many :favorites
  has_many :comments
end
