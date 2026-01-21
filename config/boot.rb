ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.
require "bootsnap/setup" # Speed up boot time by caching expensive operations.

# Ruby 3.2+ compatibility fix for Dir.exists? and File.exists?
Dir.singleton_class.send(:alias_method, :exists?, :exist?) unless Dir.respond_to?(:exists?)
File.singleton_class.send(:alias_method, :exists?, :exist?) unless File.respond_to?(:exists?)
