##############################################################################
#
#    Taï Chi Chuan Helper
#    Copyright (C) 2014 Yannick BETOU (<yannick.betou@gmail.com>).
#    All Rights Reserved
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################


This is a quick node.js website to find existing solutions to the TaiChiChuan game.

You must have a working PGSQL database, the sql to create the table is in the "sql.sql" file.
Then you must configure your database access in "dao/config.js".

The only node module to install is :
npm install pg


The search is based on a dictionnary of word, you can replace it in the "dic.txt" file, then launch dictionnary.js to put it on the database.

Launch server.js to run the web server, the website is accessible on the port 8585.

Best regards
