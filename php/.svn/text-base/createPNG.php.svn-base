<?php
$pixels = '{
      "274:130":"000",
      "274:129":"000",
      "274:128":"000",
      "274:127":"000",
      "274:126":"000",
      "274:125":"000"
    }';

$list = json_decode($pixels, true);

//#GENERATE MORE DATA
for($i = 0; $i < 10000; $i ++) {
    $list[mt_rand(1, 300) . ":" . mt_rand(1, 300)] = random_hex_color();
}

$h = 300;
$w = 300;

$gd = imagecreatetruecolor($h, $w);
// ImageFillToBorder($gd, 0, 0, 0, 255);

foreach ( $list as $xy => $color ) {
    list($r, $g, $b) = html2rgb($color);
    list($x, $y) = explode(":", $xy);
    $color = imagecolorallocate($gd, $r, $g, $b);
    imagesetpixel($gd, $x, $y, $color);
}

header('Content-Type: image/png');
imagepng($gd);

function html2rgb($color) {
    if ($color[0] == '#')
        $color = substr($color, 1);
    if (strlen($color) == 6)
        list($r, $g, $b) = array($color[0] . $color[1],$color[2] . $color[3],$color[4] . $color[5]);
    elseif (strlen($color) == 3)
        list($r, $g, $b) = array($color[0] . $color[0],$color[1] . $color[1],$color[2] . $color[2]);
    else
        return false;
    return array(hexdec($r),hexdec($g),hexdec($b));
}

function random_hex_color(){
    return sprintf("%02X%02X%02X", mt_rand(0, 255), mt_rand(0, 255), mt_rand(0, 255));
}
?>