#!/bin/sh
set -eu
label="com.esteban-media.demand-content-farm"
user_id="$(id -u)"
source_plist="/Users/gonzalo/code/esteban-media/ops/launchd/${label}.plist"
installed_plist="/Users/gonzalo/Library/LaunchAgents/${label}.plist"
state_directory="/Users/gonzalo/.local/state/esteban-media-demand-content-farm"
/usr/bin/plutil -lint "$source_plist"
/bin/mkdir -p "$state_directory" "/Users/gonzalo/Library/LaunchAgents"
/usr/bin/install -m 600 "$source_plist" "$installed_plist"
/bin/launchctl bootout "gui/${user_id}/${label}" >/dev/null 2>&1 || true
/bin/launchctl bootstrap "gui/${user_id}" "$installed_plist"
/bin/launchctl enable "gui/${user_id}/${label}"
/bin/launchctl kickstart -k "gui/${user_id}/${label}"
echo "Loaded and started ${label}"
