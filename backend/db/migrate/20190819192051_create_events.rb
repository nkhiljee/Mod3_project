class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.string :img_url
      t.string :description
      t.string :date
      t.string :start_time
      t.string :end_time
      t.string :address
      t.string :city
      t.string :state
      t.integer :zipcode
      t.integer :price
      t.float :lat
      t.float :long
      t.string :tag
      t.integer :user_id
    end
  end
end
