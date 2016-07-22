---
layout: post
title: CSV export in Rails
comments: true
tags:
- rails
- csv
---

<!--more-->

#### Helper

```rb
module CsvHelper

  # This class represents a process of rendering and sending csv data of
  # a specified moving object.
  class MovingCsv
    attr_reader :config, :data

    def initialize(moving)
      @moving          = moving
      @household_items = moving.household_items
      @config = {
        type:        "application/csv",
        filename:    "#{@moving.name}-#{Date.today}.csv",
        disposition: "attachment"
      }
      @data = render_csv
    end

    private

      def render_csv
        # Set options if needed (e.g. :col_sep, :headers, etc)
        # http://ruby-doc.org/stdlib-2.0.0/libdoc/csv/rdoc/CSV.html#DEFAULT_OPTIONS
        options = { headers: true }

        # Specify the attributes to extract.
        attributes = %w(name volume quantity volume_subtotal description)

        output = CSV.generate(options) do |csv|
          # Write column names to the first row.
          csv << attributes

          @household_items.each do |household_item|
            # Write each record as an array of values for the attributes.
            csv << attributes.map{ |attr| household_item.send(attr) }
          end
        end
        output
      end
  end

end
```

#### Controller

```rb
class HouseholdItemsController < ApplicationController
  ...

  include CsvHelper

  # Show all the items of a moving project that belongs to current user.
  def index
    respond_to do |format|
      format.html do
        @data = json_for_bar_chart(@moving)
      end
      format.csv do
        csv = MovingCsv.new(@moving)
        send_data csv.data, csv.config
      end
    end
  end
```


#### View

```slim
= link_to "Download CSV", moving_household_items_path(@moving, format: "csv"), class: "btn btn-default"
```

#### MiniTest

Make use of `CSV.parse(response.body)`.

> DEPRECATION WARNING: ActionDispatch::IntegrationTest HTTP request methods will accept only
the following keyword arguments in future Rails versions:
params, headers, env, xhr, as

```rb
require 'test_helper'

class CsvExportTest < ActionDispatch::IntegrationTest
  # Make available sign_in and sign_out methods.
  # https://github.com/plataformatec/devise#integration-tests
  include Devise::Test::IntegrationHelpers

  def setup
    @user = create(:user)
    @moving = @user.movings.create(attributes_for(:moving))
    3.times { @moving.household_items.create(attributes_for(:household_item)) }
  end

  teardown do
    Rails.cache.clear
  end

  test "Exporting household_items csv" do
    sign_in @user
    get moving_household_items_url(@moving)
    assert_template "household_items/index"

    # CSV export
    get moving_household_items_url(@moving) + '.csv'
    assert_equal "application/csv", response.content_type

    # > response.body
    # => "name,volume,quantity,volume_subtotal,description\nChair 39,30,1,30,Very comfortable\nChair 38,30,1,30,Very comfortable\nChair 37,30,1,30,Very comfortable\n"
    attrs = %w[name volume quantity volume_subtotal description]
    first_item = @moving.household_items.first

    attrs.each do |attr|
      # Check field names in CSV.
      assert response.body.include? attr
      # Check data of the first item in CSV.
      assert response.body.include? first_item[attr].to_s
    end

    # Check if the CSV has correct number of rows.
    num_of_rows = 1 + @moving.household_items.count
    assert_equal num_of_rows, response.body.split(/\n/).size
  end
end
```


#### RSpec

I found it the simplest to write controller spec for CSV download than write feature spec.
It can be as simple as follows.

```rb
require 'rails_helper'

RSpec.describe HouseholdItemsController, type: :controller do

  context "non-logged-in user" do

    # Create a user.
    let!(:user)   { FactoryGirl.create(:user) }

    # Create items on the other user.
    let!(:moving) do
      moving = FactoryGirl.create(:user).movings.create(FactoryGirl.attributes_for(:moving))
      5.times do
        moving.household_items.create(FactoryGirl.attributes_for(:household_item))
      end

      return moving
    end

    describe "GET /movings/:moving_id/household_items" do
      before { get :index, moving_id: moving.id, format: "csv" }

      it { expect(response.headers["Content-Type"]).not_to include "application/csv" }
    end
  end

  context "logged-in user" do

    # Create a user.
    let!(:user)   { FactoryGirl.create(:user) }

    # Log that user in.
    login_user # Defined in `spec/support/controller_macros.rb`

    # Create items on that user.
    let!(:moving) do
      moving = subject.current_user.movings.create(FactoryGirl.attributes_for(:moving))
      5.times do
        moving.household_items.create(FactoryGirl.attributes_for(:household_item))
      end

      return moving
    end

    describe "GET /movings/:moving_id/household_items" do

      before { get :index, moving_id: moving.id, format: "csv" }

      it { expect(response.headers["Content-Type"]).to include "application/csv" }

      attributes = %w(name volume quantity volume_subtotal description)

      attributes.each do |field|
        it "has column name - #{field}" do
          expect(response.body).to include field
        end
      end

      attributes.each do |field|
        it "has correct value for #{field}" do
          expect(response.body).to include moving.household_items.first[field].to_s
        end
      end

      it "has correct number of rows" do
        num_of_rows = 1 + moving.household_items.count
        expect(response.body.split(/\n/).size).to eq num_of_rows
      end
    end
  end
end
```

Alternatively, we can write feature spec for downloading a file.

[How to test CSV file download in Capybara and RSpec?](http://stackoverflow.com/questions/29309324/how-to-test-csv-file-download-in-capybara-and-rspec/29544674#29544674)

---

## References

- [http://qiita.com/mnishiguchi/items/2bd477a4e7c303c25014](http://qiita.com/mnishiguchi/items/2bd477a4e7c303c25014)
- [http://qiita.com/mnishiguchi/items/2e63dbe977cd278a4396](http://qiita.com/mnishiguchi/items/2e63dbe977cd278a4396)
- [http://qiita.com/mnishiguchi/items/2e63dbe977cd278a4396#%E8%B3%87%E6%96%99](http://qiita.com/mnishiguchi/items/2e63dbe977cd278a4396#%E8%B3%87%E6%96%99)
