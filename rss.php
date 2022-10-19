<?php
date_default_timezone_set('Asia/Tokyo');

$myurl = "http://www.arsvi.com";
$mypath = dirname(__FILE__);
$myname = "arsvi.com";
$mydescription = "arsvi.comのFeedです。";
$folders = array("o","w","d","b2020","b2010","b1990","b1980","ts","a");

$files = array();
foreach($folders as $folder){
array_push($files, glob("$mypath/$folder/*.htm"));
}
foreach($files as $file){
foreach ($file as $value){
$filepath[filemtime($value)][] = $value;
}
}
krsort($filepath);

$fp = fopen("$mypath/rss2.xml", "w");
fwrite($fp, '<?xml version="1.0" encoding="Shift_JIS"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>'.$myname.'</title>
<link>'.$myurl.'</link>
<description>'.$mydescription.'</description>
<lastBuildDate>'.gmdate("D, d M Y H:i:s T",time() + 32400).'</lastBuildDate>
<atom:link href="'.$myurl.'/rss2.xml" rel="self" type="application/rss+xml" />
');

$count = 0;
$limit_num = 50;

foreach($filepath as $filename){
if ( $count>=$limit_num ) { // 指定した数とマッチしたら終了
    break;
} else { // 指定した数とマッチしなかったら表示
    preg_match('/<title>([^<]+)<\/title>/s', mb_convert_encoding(file_get_contents($filename[0]),"Shift_JIS", "auto"), $findvalue);
    $title_value = $findvalue[0];
    $title = str_replace('<title>', '', $title_value);
    $title = str_replace('</title>', '', $title);
    $filetime = gmdate("D, d M Y H:i:s T", filemtime($filename[0])+32400);
    $filename = str_replace($mypath, $myurl, $filename[0]);
    fwrite($fp, '<item><title>'.$title.'</title><link>'.$filename.'</link><guid>'.$filename.'</guid><pubDate>'.$filetime.'</pubDate></item>'."\n");
    $count++;
}

}

fwrite($fp, '</channel></rss>');
fclose($fp);
?>
