# Content publishing

## Overview

When content (like pages or assets) is published from actions available in the authoring UI, it is getting copied from `/content` to `/published` content tree.

Content references (paths save in JCR) are updated (in same way as when pages are copied/moved) automatically during publishing.
So published content reference other published content items after publishing.

Publishing API allows to get information about status of content and publish/unpublish the content.
SPI interfaces allows to take actions before/after publishing/unpublishing and customize published content if needed.

CMS by default contains bundle `pl.ds.websight:websight-content-push-filesystem` providing `PublishingPostprocessor` SPI implementation saving published 
content to file system for the backward compatibility with previous approach for the content publishing. The saved files can be served for end users via HTTP server.
OSGi configurations for services `FileSystemService` and `ContentPushConfigurationService` can be used to change the published content files in file system.

See [the blog post about publishing](https://www.websight.io/blog/2023/new-publishing-framework.html).

## Using publishing module

Dependency:
```
<dependency>
    <groupId>pl.ds.websight</groupId>
    <artifactId>websight-publishing-framework-next</artifactId>
    <version>2.0.6</version>
    <scope>provided</scope>
</dependency>
```

### API

API allows to use the publishing framework.

#### PublishService

```java
package pl.ds.websight.publishing.framework;

import java.util.List;
import java.util.function.Predicate;
import javax.jcr.nodetype.NodeTypeDefinition;
import org.apache.sling.api.resource.Resource;
import org.jetbrains.annotations.NotNull;

/**
 * Provides operations for publishing of resources based on copying the resources from
 * {@value CONTENT_ROOT} to {@value PUBLISHED_ROOT}. Only JCR resources are supported.
 * <br><br>
 * It is assumed that read access to {@value PUBLISHED_ROOT} is granted for everyone. Rights for
 * modification of {@value PUBLISHED_ROOT} nodes by client session is not required - only
 * {@value PUBLISH_PRIVILEGE} on corresponding {@value CONTENT_ROOT} path is required.
 * <br><br>
 * Publication logic utilize Node Types Primary Item. If published node use type having primary item
 * then publication (recursive copying to {@value PUBLISHED_ROOT}) is done on the primary item. In
 * case of publishing node using type not defining primary item only the published resource will be
 * copied.
 * <p>
 * see {@link javax.jcr.Node#getPrimaryItem()} and {@link NodeTypeDefinition#getPrimaryItemName()}
 * </p>
 * <br><br>
 * Parents of published node are created with original primary types and required properties only.
 */
public interface PublishService {

  /**
   * JCR privilege for publish action.
   */
  String PUBLISH_PRIVILEGE = "ws:publish";

  /**
   * Root resource for content resources.
   */
  String CONTENT_ROOT = "/content";
  /**
   * Root resource for published resources.
   */
  String PUBLISHED_ROOT = "/published";

  /**
   * Checks if the user associated with the resource resolver has publishing rights for the given
   * resource. Only resources under {@value CONTENT_ROOT} root can be published.
   *
   * @param resource a resource to be verified
   * @return true if the user associated with the resource resolver has publishing rights for the
   * given resource
   */
  boolean hasPublishRights(@NotNull Resource resource) throws PublishException;

  /**
   * Publishes a single resource. Implementation has to ensure that all the preconditions are met.
   *
   * @param resource a resource to be published
   * @throws PublishException may be thrown if an error occurs trying to publish a resource
   */
  void publish(@NotNull Resource resource) throws PublishException;

  /**
   * Optimized publish method for multiple resources. Implementation has to ensure that all the
   * preconditions are met.
   *
   * @param resources a resource to be published
   * @throws PublishException may be thrown if an error occurs trying to publish resources
   */
  void publish(@NotNull List<Resource> resources) throws PublishException;

  /**
   * Unpublishes a single resource. Implementation has to ensure that all the preconditions are
   * met.
   *
   * @param resource a resource to be unpublished
   * @throws PublishException may be thrown if an error occurs trying to unpublish a resource
   */
  void unpublish(@NotNull Resource resource) throws PublishException;

  /**
   * Optimized unpublish method for multiple resources. Implementation has to ensure that all the
   * preconditions are met.
   *
   * @param resources a resource to be unpublished
   * @throws PublishException may be thrown if an error occurs trying to unpublish resources
   */
  void unpublish(@NotNull List<Resource> resources) throws PublishException;

  /**
   * Get publish view for the given content resource. The method resolves published version of the
   * resource from {@link #CONTENT_ROOT} by searching for the corresponding resource under the
   * {@link #PUBLISHED_ROOT}.
   *
   * @param resource content resource
   * @return publish view
   */
  @NotNull
  PublishView getPublishView(@NotNull Resource resource);

  /**
   * Get publish view for the given content resources parent. The view may contain
   * {@link PublishStatus#GHOST} resource views. Results are returned only for child resources
   * matching the predicate - the predicate is applied also to published resources during getting
   * ghosts.
   *
   * @param parent content resources parent
   * @param filter used to filter the child resources
   * @return publish views for resources matching the predicate
   */
  @NotNull
  List<PublishView> getPublishViews(@NotNull Resource parent, @NotNull Predicate<Resource> filter);

}
```

#### PublishView

```java
package pl.ds.websight.publishing.framework;

import java.util.Calendar;
import org.apache.sling.api.resource.Resource;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

/**
 * Class representing the view of a content resource together with the corresponding published
 * version. See {@link  PublishService}.
 */
public interface PublishView {

  @Nullable
  Resource getContentResource();

  @Nullable
  Resource getPublishedResource();

  @NotNull
  PublishStatus getPublishStatus();

  @Nullable
  Calendar getLastPublished();

  @Nullable
  String getLastPublishedBy();

}
```

#### PublishStatus

```java
package pl.ds.websight.publishing.framework;

/**
 * Represents status of publishing corresponding to content resource and published resource. See
 * {@link  PublishService}.
 */
public enum PublishStatus {

  /**
   * Both content and published versions exist. Content resource contains unpublished changes.
   */
  UNPUBLISHED_CHANGES,

  /**
   * Both content and published versions exist. There are no unpublished changes.
   */
  PUBLISHED,

  /**
   * Only content version exists.
   */
  NOT_PUBLISHED,

  /**
   * Only published version exists. Content resource was removed after publishing.
   */
  GHOST
}

```

### SPI

SPI allows to change behaviour and inject additional actions to the operations triggered by the publishing framework API.

#### NamedPublishingOperation

```java
package pl.ds.websight.publishing.framework.spi;

import org.jetbrains.annotations.NotNull;

/**
 * Allows to define operation name. Name of operation service of particular type must be unique. If
 * another operation of given type with same name is provided it replaces previous one.
 */
public interface NamedPublishingOperation {

  @NotNull
  String getName();
}

```

#### PublishingContext

```java
package pl.ds.websight.publishing.framework.spi;

import javax.jcr.Node;
import org.jetbrains.annotations.NotNull;

/**
 * Context object of JCR content nodes publishing.
 */
public interface PublishingContext {

  /**
   * Returns content root node.
   *
   * @return content root node
   */
  @NotNull
  Node getContentRootNode();

  /**
   * Returns published root node.
   *
   * @return published root node
   */
  @NotNull
  Node getPublishedRootNode();

}
```

#### PublishingNodeCustomizer

```java
package pl.ds.websight.publishing.framework.spi;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import org.jetbrains.annotations.NotNull;
import pl.ds.websight.publishing.framework.PublishException;

/**
 * Allows to customize already created, published (located under
 * {@link  pl.ds.websight.publishing.framework.PublishService#PUBLISHED_ROOT}) node during
 * publishing of the content.
 */
public interface PublishingNodeCustomizer extends NamedPublishingOperation {

  /**
   * Customizes published node during publishing of the content.
   *
   * @param context current publishing context
   * @param node    already created, published node (located under
   *                {@link  pl.ds.websight.publishing.framework.PublishService#PUBLISHED_ROOT})
   */
  void customize(@NotNull PublishingContext context, @NotNull Node node)
      throws RepositoryException, PublishException;

}
```

#### PublishingNodeFilter

```java
package pl.ds.websight.publishing.framework.spi;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import org.jetbrains.annotations.NotNull;
import pl.ds.websight.publishing.framework.PublishException;

/**
 * Allows to filter out content node during publishing.
 */
public interface PublishingNodeFilter extends NamedPublishingOperation {

  /**
   * Accepts published node during publishing of the content. If node is not accepted by the filter
   * it will not be published.
   *
   * @param context current publishing context
   * @param node    content node  (located under
   *                {@link  pl.ds.websight.publishing.framework.PublishService#CONTENT_ROOT})
   */
  boolean accepts(@NotNull PublishingContext context, @NotNull Node node)
      throws RepositoryException, PublishException;

}
```

#### PublishingPostprocessor

```java
package pl.ds.websight.publishing.framework.spi;

import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.jetbrains.annotations.NotNull;
import pl.ds.websight.publishing.framework.PublishException;

/**
 * Provides processing logic to be executed after the publishing/unpublishing.
 */
public interface PublishingPostprocessor extends NamedPublishingOperation {

  /**
   * Executed after publish.
   *
   * @param resources resources which were published
   */
  void afterPublish(@NotNull List<Resource> resources) throws PublishException;

  /**
   * Executed after unpublish.
   *
   * @param resources resources which were unpublished
   */
  void afterUnpublish(@NotNull List<Resource> resources) throws PublishException;

}
```

#### PublishingPreprocessor

```java
package pl.ds.websight.publishing.framework.spi;

import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.jetbrains.annotations.NotNull;
import pl.ds.websight.publishing.framework.PublishException;

/**
 * Provides processing logic to be executed before the publishing/unpublishing.
 */
public interface PublishingPreprocessor extends NamedPublishingOperation {

  /**
   * Executed before publish. If exception is thrown the publishing process will be stopped.
   *
   * @param resources resources which will be published
   */
  void beforePublish(@NotNull List<Resource> resources) throws PublishException;

  /**
   * Executed before unpublish. If exception is thrown the unpublishing process will be stopped.
   *
   * @param resources resources which will be unpublished
   */
  void beforeUnpublish(@NotNull List<Resource> resources) throws PublishException;

}
```

#### PublishingPropertyCustomizer

```java
package pl.ds.websight.publishing.framework.spi;

import javax.jcr.Property;
import javax.jcr.RepositoryException;
import org.jetbrains.annotations.NotNull;
import pl.ds.websight.publishing.framework.PublishException;

/**
 * Allows to customize already created, published (located under
 * {@link  pl.ds.websight.publishing.framework.PublishService#PUBLISHED_ROOT}) property during
 * publishing of the content.
 */
public interface PublishingPropertyCustomizer extends NamedPublishingOperation {

  /**
   * Customizes published property during publishing of the content.
   *
   * @param context  current publishing context
   * @param property already created, published property (located under
   *                 {@link  pl.ds.websight.publishing.framework.PublishService#PUBLISHED_ROOT})
   */
  void customize(@NotNull PublishingContext context, @NotNull Property property)
      throws RepositoryException, PublishException;

}
```

#### PublishingPropertyFilter

```java
package pl.ds.websight.publishing.framework.spi;

import javax.jcr.Property;
import javax.jcr.RepositoryException;
import org.jetbrains.annotations.NotNull;
import pl.ds.websight.publishing.framework.PublishException;

/**
 * Allows to filter out content property during publishing.
 */
public interface PublishingPropertyFilter extends NamedPublishingOperation {

  /**
   * Accepts published property during publishing of the content. If property is not accepted by the
   * filter it will not be published.
   *
   * @param context  current publishing context
   * @param property content property  (located under
   *                 {@link  pl.ds.websight.publishing.framework.PublishService#CONTENT_ROOT})
   */
  boolean accepts(@NotNull PublishingContext context, @NotNull Property property)
      throws RepositoryException, PublishException;

}
```