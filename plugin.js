
CKEDITOR.plugins.add( 'linktowine',
{
	init : function( editor )
	{
		// Add the link button
		editor.addCommand( 'linktowine', new CKEDITOR.dialogCommand( 'linktowine' ) );

		editor.ui.addButton( 'linktowine',
			{
				label : 'Link to wine',
				icon : this.path + 'images/linktowine.gif',
				command : 'linktowine'
			} );



		if ( editor.contextMenu ) {
			editor.addMenuGroup( 'linktowineGroup' );
			editor.addMenuItem( 'linktowineItem', {
				label : 'Link to wine',
				command : 'linktowine',
				group : 'linktowine',
				order : 1
			});

			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'a', true ) ) {
					return { linktowineItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}

		CKEDITOR.dialog.add( 'linktowine', this.path + 'dialogs/link.js' );
	}
} );
