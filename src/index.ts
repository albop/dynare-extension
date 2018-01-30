/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

import {
  Widget
} from '@phosphor/widgets';


import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import {
  ContentsManager
} from '@jupyterlab/services';

import '../style/index.css';

/**
 * A widget for rendering data, for usage with rendermime.
 */



export
class RenderedData extends Widget implements IRenderMime.IRenderer {
  /**
   * Create a new widget for rendering Vega/Vega-Lite.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
  };
  //
  // test_kernel() {
  //
  //
  //   let contents = new ContentsManager();
  //
  //   // Create a new python file.
  //   contents.newUntitled({ path: '/foo', type: 'file', ext: 'py' }).then(
  //    (model) => {
  //      console.log('new file:', model.path);
  //    }
  //   );
  //
  //   // Get the contents of a directory.
  //   contents.get('/foo/bar').then(
  //    (model) => {
  //      console.log('files:', model.content);
  //    }
  //   );
  //   //
  //   // // Rename a file.
  //   // contents.rename('/foo/bar.txt', '/foo/baz.txt');
  //   //
  //   // // Save a file.
  //   // contents.save('/foo/test.ipynb');
  //   //
  //   // // Delete a file.
  //   // contents.delete('/foo/bar.txt');
  //   //
  //   // // Copy a file.
  //   // contents.copy('/foo/bar.txt', '/baz').then((model) => {
  //   //     console.log('new path', model.path);
  //   // });
  //   //
  //   // // Create a checkpoint.
  //   // contents.createCheckpoint('/foo/bar.ipynb').then((model) => {
  //   //   let checkpoint = model;
  //   //
  //   //   // Restore a checkpoint.
  //   //   contents.restoreCheckpoint('/foo/bar.ipynb', checkpoint.id);
  //   //
  //   //   // Delete a checkpoint.
  //   //   contents.deleteCheckpoint('/foo/bar.ipynb', checkpoint.id);
  //   // });
  //   //
  //   // // List checkpoints for a file.
  //   // contents.listCheckpoints('/foo/bar.txt').then((models) => {
  //   //     console.log(models[0].id);
  //   // });
  // }

  /**
   * Render into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {



      let data = model.data['application/vnd.dynare.mod'] as string;
      this.node.textContent = data;
      resolve();
    });
  }

}

/**
 * A mime renderer factory for data.
 */
export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: false,
  mimeTypes: ['application/vnd.dynare.mod'],
  createRenderer: options => new RenderedData(options)
};

const extensions = {
    id: `jupyterlab-dynare`,
    rendererFactory,
    rank: 0,
    dataType: 'string',
    fileTypes: [{
      name:'Dynare',
      extensions:['.mod','.json'],
      mimeTypes: ['application/vnd.dynare.mod'],
      iconClass: 'jp-MaterialIcon jp-MSAIcon'
    }],
    documentWidgetFactoryOptions: {
      name: 'Dynare',
      primaryFileType: 'Dynare',
      fileTypes: ['Dynare'],
      defaultFor: ['Dynare'],
    }
  } as IRenderMime.IExtension;

export default extensions;
