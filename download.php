<?php

/*
// +--------------------------------------------------------------------------+
// | Project:    NVTracker - NetVision BitTorrent Tracker                     |
// +--------------------------------------------------------------------------+
// | This file is part of NVTracker. NVTracker is based on BTSource,          |
// | originally by RedBeard of TorrentBits, extensively modified by           |
// | Gartenzwerg.                                                             |
// |                                                                          |
// | NVTracker is free software; you can redistribute it and/or modify        |
// | it under the terms of the GNU General Public License as published by     |
// | the Free Software Foundation; either version 2 of the License, or        |
// | (at your option) any later version.                                      |
// |                                                                          |
// | NVTracker is distributed in the hope that it will be useful,             |
// | but WITHOUT ANY WARRANTY; without even the implied warranty of           |
// | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            |
// | GNU General Public License for more details.                             |
// |                                                                          |
// | You should have received a copy of the GNU General Public License        |
// | along with NVTracker; if not, write to the Free Software Foundation,     |
// | Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA            |
// +--------------------------------------------------------------------------+
// | Obige Zeilen dürfen nicht entfernt werden!    Do not remove above lines! |
// +--------------------------------------------------------------------------+
 */

require_once("include/bittorrent.php");
require_once("include/benc.php");

userlogin();

if ($GLOBALS["DOWNLOAD_METHOD"] == DOWNLOAD_REWRITE) {
    if (!preg_match('/\\/download\\/(\d{1,10})\\/(.+)\.torrent$/', $_SERVER["REQUEST_URI"], $matches)) {
            httperr();
    }
    $id = 0 + $matches[1];
} else {
    $id = intval($_GET["torrent"]);
}

if(!$id)
    httperr();

$qry = $GLOBALS["DB"]->prepare("SELECT name, activated FROM torrents WHERE id = :tid");
$qry->bindParam(':tid', $id, PDO::PARAM_INT);
$qry->execute();
if($qry->rowCount())
	$row = $qry->Fetch(PDO::FETCH_ASSOC);
$fn = $GLOBALS["TORRENT_DIR"] . "/" . $id . ".torrent";

if (!$row || !is_file($fn) || !is_readable($fn) || $row["activated"] != "yes")
    httperr();
    
if ($GLOBALS["MEMBERSONLY"]) {
    loggedinorreturn();
    $wait = get_wait_time($CURUSER["id"], $id);
    if ($wait > 0) {
		header("Content-Type: text/plain");
		die("Du hast für diesen Torrent noch Wartezeit abzuwarten.\nDu kannst erst Torrent-Dateien herunterladen, wenn die\nWartezeit abgelaufen ist!");
    }
}

$qry = $GLOBALS["DB"]->prepare("UPDATE torrents SET hits = hits + 1 WHERE id = :tid");
$qry->bindParam(':tid', $id, PDO::PARAM_INT);
$qry->execute();

header("Content-Type: application/x-bittorrent");
header("Content-Transfer-Encoding: binary");

if ($GLOBALS["DOWNLOAD_METHOD"] == DOWNLOAD_ATTACHMENT) {
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");            
    header("Content-Disposition: attachment; filename=\"" . $row["name"] . ".torrent\"");
}

if($GLOBALS["CLIENT_AUTH"] == CLIENT_AUTH_PASSKEY && $GLOBALS["MEMBERSONLY"]){
	$qry = $GLOBALS["DB"]->prepare("SELECT passkey FROM users WHERE id = :uid");
	$qry->bindParam(':uid', $CURUSER["id"], PDO::PARAM_INT);
	$qry->execute();
	if($qry->rowCount())
		$row = $qry->Fetch(PDO::FETCH_ASSOC);
    $passkey = preg_replace_callback('/./s', "hex_esc", str_pad($row["passkey"], 8));
    $announce_url = preg_replace("/\\{KEY\\}/", $passkey, $GLOBALS["PASSKEY_ANNOUNCE_URL"]);
	$torrent = bdec_file($fn);
	$torrent["announce"] = $announce_url;
    $torrentdata = benc($torrent);
    header("Content-Length: " . mb_strlen($torrentdata, "ASCII"));
    echo trim($torrentdata);
} else {
    // Just write out torrent
    header("Content-Length: ".filesize($fn));
    readfile($fn);
}
?>