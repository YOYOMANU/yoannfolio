<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $category
 * @property string $short_description
 * @property string $long_description
 * @property string $problem
 * @property string $solution
 * @property string $role
 * @property string $context
 * @property string $swatch_class
 * @property string|null $live_url
 * @property string|null $repo_url
 * @property int $is_featured
 * @property string $status
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProjectFeature> $features
 * @property-read int|null $features_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Technology> $technologies
 * @property-read int|null $technologies_count
 * @method static \Database\Factories\ProjectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereContext($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereLiveUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereLongDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProblem($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereRepoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereShortDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereSolution($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereSwatchClass($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 */
	class Project extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $project_id
 * @property string $title
 * @property string $description
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProjectFeature whereUpdatedAt($value)
 */
	class ProjectFeature extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $key
 * @property string $label
 * @property string $description
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Technology> $technologies
 * @property-read int|null $technologies_count
 * @method static \Database\Factories\StackLayerFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StackLayer whereUpdatedAt($value)
 */
	class StackLayer extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StackLayer> $stackLayers
 * @property-read int|null $stack_layers_count
 * @method static \Database\Factories\TechnologyFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Technology whereUpdatedAt($value)
 */
	class Technology extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Passkeys\Passkey> $passkeys
 * @property-read int|null $passkeys_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Laravel\Fortify\Contracts\PasskeyUser, \Laravel\Passkeys\Contracts\PasskeyUser {}
}

