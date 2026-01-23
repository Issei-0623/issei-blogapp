# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_articles_on_user_id  (user_id)
#

class Article < ApplicationRecord
    has_one_attached :eyecatch
    has_rich_text :content

    validates :title, presence: true
    validates :title, length: { minimum: 2, maximum: 100 }
    validates :title, format: { with: /\A(?!@)/ }

    validates :content, presence: true
    # validates :content, length: { minimum: 10 }
    # validates :content, uniqueness: true

    # validate :validate_title_and_content_length

    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    belongs_to :user

    private
    def validate_title_and_content_length
        char_count = self.title.length + self.content.length
        unless char_count < 200
            errors.add(:content, '200文字以下で入力してください')
        end
    end
end
