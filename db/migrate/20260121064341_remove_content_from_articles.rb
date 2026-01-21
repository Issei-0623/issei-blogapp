class RemoveContentFromArticles < ActiveRecord::Migration[8.0]
  def up
    remove_column :articles, :content
  end

  def down
    add_column :articles, :content, :text
  end
end
