/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add( 'linktowine', function( editor )
{
	//<!-- linktowine START -->
	CKEDITOR.scriptLoader.load( Drupal.settings.basePath + "misc/jquery.js");
	//<!-- linktowine END -->

	return {
		title : 'Link to wine',
		minWidth : 350,
		minHeight : 230,
		contents : [
			{
				id : 'info',
				label : editor.lang.link.info,
				title : editor.lang.link.info,
				elements :
				[
					{
						type : 'text',
						id : 'text',
						label :'Text to link',
						validate: CKEDITOR.dialog.validate.notEmpty( "Text to link field cannot be empty." ),

						setup: function (element) {
							this.setValue( element.getText() );
						},

						commit: function (element) {
							element.setText( this.getValue() );
						}
					},
					{
						type : 'text',
						id : 'nid',
						label :'Nid',
						validate: CKEDITOR.dialog.validate.notEmpty( "Nid field cannot be empty." ),

						setup: function (element) {
							this.setValue( element.getAttribute( "rel" ) );
						},

						commit: function( element ) {
							element.setAttribute( "data-action", 'openwine' );
							element.setAttribute( "data-nid", this.getValue() );
						}
					},
				],
			},
		],
		onShow : function() {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

			if ( element )
				element = element.getAscendant( 'span', true );

			if ( !element || element.getName() != 'span' ) {
				element = editor.document.createElement( 'span' );
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			this.element = element;
			if ( !this.insertMode )
				this.setupContent( this.element );
		},

		onOk : function()
		{
			var dialog = this;
			var a = this.element;
			dialog.commitContent( a );

			if ( this.insertMode )
				editor.insertElement( a );
		}
	};
} );
