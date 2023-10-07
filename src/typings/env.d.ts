interface AnyObject {
	[k: string]: any
}

interface ViewTransition {
  ready: Promise<void>;
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
}

