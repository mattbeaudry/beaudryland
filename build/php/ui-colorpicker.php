<?php 
	if (!$defautColor) {
		$defautColor = '#666';
	}
?>
<div class="bui-colorpicker">
    <input class="bui-textinput bui-colorpicker-input" type="text" name="hexcode" value="<?php echo $defautColor; ?>" style="background-color: <?php echo $defautColor;?>">
    <div class="bui-colorpicker-eraser"></div>
    <div class="bui-colorpalette">
        <?php include 'part-colors.php'; ?>
    </div>
</div>