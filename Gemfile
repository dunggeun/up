source 'https://rubygems.org'

if ENV['VERCEL'] == '1'
  # https://github.com/dunggeun/up/issues/27
  ruby '2.7.0'
else
  # You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
  ruby ">= 2.6.10"
end

gem 'cocoapods', '>= 1.12'
gem "fastlane"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
