#!/bin/sh
set -eu

label="com.esteban-media.weekly-digest"
user_id="$(id -u)"
domain="gui/${user_id}"
source_plist="/Users/gonzalo/code/esteban-media/ops/launchd/${label}.plist"
installed_plist="/Users/gonzalo/Library/LaunchAgents/${label}.plist"
state_directory="/Users/gonzalo/.local/state/esteban-media-weekly-digest"
system_time_zone="$(/usr/bin/readlink /etc/localtime || true)"

case "$system_time_zone" in
  */America/New_York) ;;
  *)
    echo "Refusing to install: launchd follows the macOS timezone, which is not America/New_York (${system_time_zone:-unknown})." >&2
    exit 1
    ;;
esac

/usr/bin/plutil -lint "$source_plist"
/bin/mkdir -p "$state_directory" "/Users/gonzalo/Library/LaunchAgents"
/usr/bin/install -m 600 "$source_plist" "$installed_plist"

/bin/launchctl bootout "${domain}/${label}" >/dev/null 2>&1 || true
/bin/launchctl bootstrap "$domain" "$installed_plist"
/bin/launchctl enable "${domain}/${label}"
/bin/launchctl kickstart -k "${domain}/${label}"

echo "Loaded and started ${domain}/${label}"
