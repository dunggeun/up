source 'https://rubygems.org'

if ENV['VERCEL'] == '1'
  # https://github.com/dunggeun/up/issues/27
  ruby '2.7.0'
else
  # You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
  ruby File.read(File.join(__dir__, '.ruby-version')).strip
end

gem 'cocoapods', '~> 1.11', '>= 1.11.3'
