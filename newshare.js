//Initialization Functions
var designs = [],
	currentDesign,
	currentSns,
	facebook = 'facebook',
	twitter = 'twitter',
	googleplus = 'googleplus',
	pinterest = 'pinterest',
	data = [
		{
			'designname': 'NN TEST 2',
			'designid': '564898'
		},
		{
			'designname': 'ELEMENTZ',
			'designid': '548646'
		},
		{
			'designname': 'PURERAY3',
			'designid': '524912'
		}
	],
	sharecontentTemplate = '<div class="sharecontent"><div class="shareleft"><div class="shareimages"><div class="sharefront"><img src="" /></div><div class="shareback"><img src="" /></div></div><div class="sharebuttonbox"><a class="sharebutton" href="#" target="_blank"><span class="outerspan"><span class="innerspan">SHARE</span></span></a></div></div><div class="shareright"><textarea></textarea></div></div>';

$(document).ready(function(){
	iconOnClick();
	designs = data;
	currentDesign = 0;
	currentSns = facebook;
	$('#sharedesignname').text(designs[currentDesign].designname);	
	designs.forEach(function(value){
		createShareContent(value.designid);
	});
	$('#midbox').anyslider({
		interval:0
	});
	$('.as-prev-arrow').click(goPrev);
	$('.as-next-arrow').click(goNext);
	setShareLink(currentSns, designs[currentDesign].designid, designs[currentDesign].designname);
	$('.sharebutton').click(setShareText);
});

var createShareContent = function(designid){
	var newContent = $(sharecontentTemplate.substring(0));
	newContent.find('.sharefront img').attr('src', getCompleteImageurl(true, designid));
	newContent.find('.shareback img').attr('src', getCompleteImageurl(false, designid));
	$('#midbox').append(newContent);
};

//Functions to change current design
//For the two nav buttons
var goPrev = function(){
	if(currentDesign === 0){
		currentDesign = designs.length - 1;
	}
	else{
		currentDesign--;
	}
	$('#sharedesignname').text(designs[currentDesign].designname);
	setShareLink(currentSns, designs[currentDesign].designid, designs[currentDesign].designname);
};

var goNext = function(){
	if(currentDesign === designs.length - 1){
		currentDesign = 0;
	}
	else{
		currentDesign++;
	}
	$('#sharedesignname').text(designs[currentDesign].designname);
	setShareLink(currentSns, designs[currentDesign].designid, designs[currentDesign].designname);
};

//Function to change sns icon
//For icon buttons
var iconOnClick = function(){
	$('.iconbox button').click(
		function(){
			var $id = $(this).attr('id'),
				length = $id.length,
				sns = $id.substring(0, length - 7),				
				blueurl = $('.selectedsns').css('background-image').replace('orange', 'blue'),
				orangeurl;	
			currentSns = sns;
			$('.selectedsns').css('background-image', blueurl);
			$('.selectedsns').removeClass('selectedsns');
			$(this).addClass('selectedsns');
			orangeurl = $('.selectedsns').css('background-image').replace('blue', 'orange'),
			$('.selectedsns').css('background-image', orangeurl);
			setShareLink(currentSns, designs[currentDesign].designid, designs[currentDesign].designname);
		}
	);
};

//Functions to set share button
//For icon buttons
var designurlPrefix = 'http://minor.testing.dev.designashirt.com',
	imageurlPrefix = 'http://dev-media.designashirt.com/DesignPreviews/',
	imageurlFrontSuffix = '.full.small.front.jpg',
	imageurlBackSuffix = '.full.small.back.jpg';
	

var setShareLink = function(sns, designid, designname, text){
	var href = '';
	if(sns === facebook){
		var link = 'http://www.facebook.com/sharer/sharer.php?s=100',
			url = 'p[url]=' + getCompleteDesignurl(designid, slugify(designname)),
			image0 = 'p[images][0]=' + getCompleteImageurl(true, designid),
			image1 = 'p[images][1]=' + getCompleteImageurl(false, designid),
			title = 'p[title]=' + 'CHECK OUT MY DESIGN ' + designname + ' @designashirt.com!',
			summary = 'p[summary]=' + 'My Customized Shirt ' + designname + ' @designashirt.com!',
			amp = '&';
		href = link + amp + url + amp + image0 + amp + image1 + amp + summary + amp + title;
		$('.shareright textarea').attr('placeholder', 'Facebook does not support prefill text.').attr('disabled', true);
	}
	else if(sns === twitter){
		var link = "https://twitter.com/intent/tweet?",
			url = 'url=' + getCompleteDesignurl(designid, slugify(designname)),
			text = 'text=' + (text || 'CHECK OUT MY DESIGN ' + designname + ' @designashirt.com!'),
			via = 'via=DesignAShirt',
			amp = '&amp;';
		href = link + url + amp + text + amp + via;
		$('.shareright textarea').attr('placeholder', '').attr('disabled', false);
	}
	else if(sns === googleplus){
		var link = 'https://plus.google.com/share?',
			url = 'url=' + getCompleteDesignurl(designid, slugify(designname));
		href = link + url;
		$('.shareright textarea').attr('placeholder', 'Google Plus does not support prefill text.').attr('disabled', true);
	}
	else if(sns === pinterest){
		var link = 'http://www.pinterest.com/pin/create/button/?',
			url = 'url=' + getCompleteDesignurl(designid, slugify(designname)),
			media = '&media=' + getCompleteImageurl(true, designid),
			description = '&description=' + (text || 'CHECK OUT MY DESIGN ' + designname + ' @designashirt.com!');
		href = link + url + media + description;
		$('.shareright textarea').attr('placeholder', '').attr('disabled', false);
	}
	$('.sharebutton').attr('href', href);
};

//Function to send the text in the textarea to the sns
//For share button
var setShareText = function(){
	var defaultPrefillText = 'CHECK OUT MY DESIGN ' + designs[currentDesign].designname + ' @designashirt.com!',		
		textareaText = $(this).parent().parent().next().children().val();
	if(currentSns === facebook || currentSns === googleplus){
		return;
	}
	else{		
		setShareLink(currentSns, designs[currentDesign].designid, designs[currentDesign].designname, textareaText);
	}
};

//Helper functions to compose url
var getCompleteDesignurl = function(designid, designname){
	return designurlPrefix + '/' + designname + '/' + designid + '/preview';
};

var getCompleteImageurl = function(isFront, designid){
	return imageurlPrefix + designid + ((isFront) ? imageurlFrontSuffix : imageurlBackSuffix);
};

var slugify = function(designname){
	var str = designname.toLowerCase()
						.replace(/[^a-z0-9\s-]/g, '')
						.replace(/\s+/g, ' ').trim();
	str = str.substr(0, str.length <= 45 ? str.length : 45).trim();
	str = str.replace(/\s/g, '-')
			 .replace(/-+/g, '-');
	return str;
}