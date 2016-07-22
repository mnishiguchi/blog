---
layout: post
title: File basics in Ruby
comments: true
tags:
- ruby
- file
- rails
---

<!--more-->

## Read


```rb
# Check currently working directory.
puts "Dir.pwd: #{Dir.pwd}"
```

```rb
require 'open-uri'
properties = open("db/feeds/parsed_feed_example.json") { |io| io.read }
```

```rb
xml = open("#{Dir.pwd}/test/fixtures/files/bozzuto.xml") { |io| io.read }
```

```rb
FILE_DIR = "#{Dir.pwd}/test/fixtures/files"
filename = "ash_a.xml"
path     = File.join(FILE_DIR, filename)
puts "path: #{path}"

# Read that file.
xml = File.read(path)
```

#### Reading multiple files

```rb
def all_feed_xml_files
  pattern   = File.join(Dir.pwd, "test", "fixtures", "files", "feed_*.xml")
  filenames = Dir.glob(pattern)

  [].tap do |xml_files|
    filenames.each do |file|
      xml_files << File.read(file)
    end
  end
end
```


## Write

```rb
# Convert xml to hash using ActiveSupport::XMLConverter
hash = Hash.from_xml(xml)

# Extract desired info from the resulting hash.
info_hash = hash["PhysicalProperty"]["Property"]

# Convert the info to JSON
info_json = info_hash.to_json

# Write the info to a new file.
destination = "tmp.json"
path = File.join(FILE_DIR, destination)
File.write(path, info_json)
```

```rb
File.open("db/feeds/property.json", 'w') { |file| file.write(@property_hash.to_json) }
```
